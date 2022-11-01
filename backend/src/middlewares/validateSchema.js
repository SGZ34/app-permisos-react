export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
    });

    next();
  } catch (error) {
    return res.status(400).json({ errorMessage: error.message });
  }
};
