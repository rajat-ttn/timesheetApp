module.exports = (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    } else {
        res.json({success: false, error: 'Not authorized user'})
    }
}