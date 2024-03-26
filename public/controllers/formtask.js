const { setTask } = require('../utils/setDatabase');

formtask = async (req, res) => {
	const formData = req.body;
	await setTask(formData.description);

	res.render('submitted', { formData, message: 'created' });
};

module.exports = {
	formtask,
};
