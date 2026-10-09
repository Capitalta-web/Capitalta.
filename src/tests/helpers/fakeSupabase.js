/**
 * Fake mínimo en memoria del query builder de supabase-js, suficiente para
 * probar otpStore (select/insert/update con eq/gte/order/limit/maybeSingle).
 */
export function createFakeSupabase(initial = {}) {
  const tables = {};
  Object.entries(initial).forEach(([name, rows]) => {
    tables[name] = rows.map((r) => ({ ...r }));
  });
  let seq = 1000;

  function builder(table) {
    const state = {
      op: 'select',
      filters: [],
      order: null,
      limit: null,
      patch: null,
      row: null,
      head: false,
      count: null,
      returning: false
    };
    const rows = () => (tables[table] = tables[table] || []);
    const matches = (r) => state.filters.every((f) => f(r));

    const exec = () => {
      if (state.op === 'insert') {
        const row = { id: `id-${seq++}`, created_at: new Date(Date.now() + seq).toISOString(), ...state.row };
        rows().push(row);
        return { data: state.returning ? [row] : null, error: null };
      }
      if (state.op === 'update') {
        const affected = rows().filter(matches);
        affected.forEach((r) => Object.assign(r, state.patch));
        return { data: state.returning ? affected.map((r) => ({ ...r })) : null, error: null };
      }
      let result = rows().filter(matches);
      if (state.order) {
        const { col, ascending } = state.order;
        result = [...result].sort((a, b) => (a[col] > b[col] ? 1 : -1) * (ascending ? 1 : -1));
      }
      if (state.limit !== null) result = result.slice(0, state.limit);
      if (state.head) return { data: null, count: result.length, error: null };
      return { data: result.map((r) => ({ ...r })), count: result.length, error: null };
    };

    const api = {
      select(_cols, opts = {}) {
        if (state.op === 'select') {
          state.head = Boolean(opts.head);
        } else {
          state.returning = true;
        }
        return api;
      },
      insert(row) {
        state.op = 'insert';
        state.row = Array.isArray(row) ? row[0] : row;
        return api;
      },
      update(patch) {
        state.op = 'update';
        state.patch = patch;
        return api;
      },
      eq(col, val) {
        state.filters.push((r) => r[col] === val);
        return api;
      },
      gte(col, val) {
        state.filters.push((r) => r[col] >= val);
        return api;
      },
      order(col, { ascending = true } = {}) {
        state.order = { col, ascending };
        return api;
      },
      limit(n) {
        state.limit = n;
        return api;
      },
      maybeSingle() {
        const res = exec();
        return Promise.resolve({ data: res.data && res.data.length ? res.data[0] : null, error: res.error });
      },
      then(resolve, reject) {
        return Promise.resolve(exec()).then(resolve, reject);
      }
    };
    return api;
  }

  return { from: builder, tables };
}
