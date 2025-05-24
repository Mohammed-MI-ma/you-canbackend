router.post('/flash-sale', async (req, res) => {
  const { productId, discount, startTime, endTime } = req.body;
  const { store, seller } = req.session;

  if (!store || !seller) return res.status(401).send('Store not connected');

  const sale = new FlashSale({ store, seller, productId, discount, startTime, endTime });
  await sale.save();

  res.json({ success: true, sale });
});
