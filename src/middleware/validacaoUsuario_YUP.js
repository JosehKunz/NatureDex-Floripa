const yup = require('yup');

// Definindo mensagens de erro personalizadas
yup.setLocale({
  mixed: {
    required: 'O campo é obrigatório',
  },
  string: {
    email: 'O e-mail inserido é inválido',
  }
});

// Modelo para validar os dados do usuário utilizando YUP
const modelo = yup.object().shape({
    email: yup.string().email(),
    data_nascimento: yup.date().nullable(),
});

// Middleware da validação
async function validarUsuario(req, res, next) {
    try {
        await modelo.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map(err => ({ [err.path]: err.message }));
        return res.status(400).json({ errors });
    }
}

module.exports = { validarUsuario };
