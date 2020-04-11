const express = require('express');
const csrf = require('csurf');
const db = require('./db/models');
const router = express.Router();
const { check, validationResult } = require('express-validator')

const csrfProtection = csrf({ cookie: true });
const parkValidators = [
    check('parkName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for parkName.')
        .isLength({ max: 255 })
        .withMessage('Park Name must not be more than 255 characters long.'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for city')
        .isLength({ max: 100 })
        .withMessage('city must not be more than 100 characters long'),
    check('provinceState')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for state')
        .isLength({ max: 100 })
        .withMessage('state must not be more than 100 characters long'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for country')
        .isLength({ max: 100 })
        .withMessage('country must not be more than 100 characters long'),
    check('opened')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for opened')
        .isISO8601()
        .withMessage('Please provide a valid date for opened'),
    check('size')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for size')
        .isInt({ min: 0 })
        .withMessage('Please provide a valid integer for size'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for description')
]



router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    });
});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);


router.get('/parks', asyncHandler(async (req, res)=>{
    const parks = await db.Park.findAll({ order: [['parkName', 'ASC']]});
    res.render('park-list', { title: 'Parks', parks });
}));

router.get('/park/:id(\\d+)', asyncHandler(async (req, res) => {
    const parkID = parseInt(req.params.id, 10);
    const park = await db.Park.findByPk(parkID);
    res.render('park-detail', {
        title: 'Park Detail',
        park
    });
}))

router.get('/park/add', csrfProtection, (req, res) => {
    const park = db.Park.build();
    res.render('park-add', {
        title: 'Add Park',
        park,
        csrfToken: req.csrfToken()
    });
});

router.post('/park/add', csrfProtection, parkValidators, asyncHandler(async (req, res) => {
    const { parkName, city, provinceState, country, opened, size, description} = req.body
    const validatorErrors = validationResult(req);
    let park = db.Park.build({
        parkName,
        city, 
        provinceState, 
        country, 
        opened, 
        size, 
        description
    });
    
    if(validatorErrors.isEmpty){
        park = await park.save();
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map(e=> e.msg)
        res.render('park-add', {
            title: 'Add Park',
            park,
            errors, 
            csrfToken: req.csrfToken()
        });
    }
    
    
}));

if (process.env.NODE_ENV !== "production") {
    router.get('/error-test', () => {
        throw new Error('This is a test error!');
    });
}
module.exports = router;