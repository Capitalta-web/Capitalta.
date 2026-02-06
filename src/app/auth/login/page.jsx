// @project
import { Login1 } from '@/blocks/auth/login';

/***************************  LOGIN - DATA  ***************************/

const data = {
  heading: 'Iniciar Sesión',
  caption: 'Bienvenido de nuevo a Capitalta',
  signupLink: '/auth/signup',
  testimonials: [
    {
      review: 'La plataforma de Capitalta ha transformado la manera en que gestionamos nuestras finanzas corporativas. ¡Increíble!',
      ratings: 5,
      profile: { avatar: '/assets/images/user/avatar2.png', name: 'Ana Martínez', role: 'Directora Financiera' }
    },
    {
      review: 'Rapidez y transparencia en cada proceso. Definitivamente la mejor opción para crédito empresarial.',
      ratings: 5,
      profile: { avatar: '/assets/images/user/avatar1.png', name: 'Carlos Ruiz', role: 'CEO TechSolutions' }
    },
    {
      review: 'El soporte y la facilidad de uso son excepcionales. Muy recomendado para cualquier PYME.',
      ratings: 4,
      profile: { avatar: '/assets/images/user/avatar3.png', name: 'Laura Gómez', role: 'Gerente General' }
    }
  ],
  image: { light: '/assets/images/graphics/ai/desktop1-light.svg', dark: '/assets/images/graphics/ai/desktop1-dark.svg' }
};

/***************************  PAGE - LOGIN  ***************************/

export const metadata = {
  title: 'Iniciar Sesión | Capitalta'
};

export default function LoginPage() {
  return <Login1 {...data} />;
}
