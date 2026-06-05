// @mui
import Typography from '@mui/material/Typography';

/***************************  SMALL HERO - HEADLINE  ***************************/

function HeadlineTextAbout() {
  return <Typography variant="h2">Our Passionate Team is here to Deliver Value to You</Typography>;
}

function HeadlineText() {
  return <Typography variant="h2">Our Full Range of Courses</Typography>;
}

function HeadlineTextBlog() {
  return <Typography variant="h2">Explora nuestro centro de conocimiento</Typography>;
}

/***************************  SMALL-HERO - DATA  ***************************/

export const aboutSmallHero1 = {
  chip: {
    label: 'Sobre nosotros'
  },
  captionLine: `Descubre quiénes somos y cómo impulsamos el crecimiento financiero de nuestros clientes.`,
  headLine: <HeadlineTextAbout />
};

export const smallHero1 = {
  chip: {
    label: 'Nuestros Cursos'
  },
  captionLine: `A world of learning at your fingertips. Discover courses designed 
to inspire and empower.`,
  headLine: <HeadlineText />
};

export const blogSmallHero1 = {
  chip: {
    label: 'Blog'
  },
  captionLine: `Noticias, consejos financieros y actualizaciones sobre el mundo del crédito y los negocios.`,
  headLine: <HeadlineTextBlog />
};
