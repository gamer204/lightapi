module.exports = {
	attributes: {
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
				notEmpty: true,
				notNull: true
			}
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				notNull: true,
				min: 6
			},
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			validate: {
				isIn: [[true, false]],
			}
		},
	},
}