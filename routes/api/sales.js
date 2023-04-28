const router = require('express').Router();
const { Router } = require('express');
const { body } = require('express-validator');
const { Sale } = require('../../db');
const {check,validationResult} = require('express-validator');


router.get('/', async (req, res) => {
    const sales = await Sale.findAll();
    res.json(sales);
});

router.get('/:saleId', async (req, res) => {
    const Id= await Sale.findOne({where: {id: req.params.saleId}});
    if (Id) {  

        const sales = await Sale.findAll({
        where : { id: req.params.saleId}   
        });  

        res.json(sales);

    }else{

        res.json({ error: 'Id no existe en la bd'});
    } 
});

 
router.post('/',  [
    check('operador','El Nombre del Operador es obligatorio').not().isEmpty(),
    check('valor','El Campo Valor es obligatorio').not().isEmpty(),
    check('valor','El Campo Valor debe ser numérico').isNumeric()
], async (req, res) => {


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errores: errors.array()})
    }  
    
    const sale = await Sale.create(req.body);
    res.json(sale);

});


router.put('/:saleId', async (req, res) => {

    const Id= await Sale.findOne({where: {id: req.params.saleId}});
    if (Id) {     
            const sale = await Sale.update(req.body, {
            where : { id: req.params.saleId}   
            });
            res.json( {success: 'Updated Sale'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

});



router.delete('/:saleId',async (req, res) => {   
const identification = req.params.saleId;    

if(identification)
{
    const Id= await Sale.findOne({where: {id: req.params.saleId}});
    if (Id) {     
        await Sale.destroy({
            where : { id: req.params.saleId}   
           });  
    
        res.json( {success: 'Deleted Sale'} );
    }
    else
    {
        res.json({ error: 'Id no existe en la bd'});
    } 

}else 
{
res.status(404).send("Sorry, we cannot find that!"); 
}

});

module.exports = router;