module.exports = (ctrl) => {
    const func = async (req, res, next) => {
      try {
        const result = await ctrl(req, res, next);
        const isCreated = req.path.includes('comment') || 
          req.method === 'POST' && req.path.includes('register' || 'posts');
  
        res.status(isCreated ? 201 : 200).json(result);
      } catch (err) {
        next(err);
      }
    };
  
    return func;
  };

  