/* eslint no-console: 0 */
import chalk from 'chalk';

const Logger = {
	ok: data => {
		console.log(chalk.greenBright.bold('[OK]'), data);
	},
	info: data => {
		console.info(chalk.blueBright.bold('[INFO]'), data);
	},
	warn: data => {
		console.warn(chalk.yellowBright.bold(['WARN']), data);
	},
	error: data => {
		console.error(chalk.redBright.bold('[ERROR]'), data);
	}
};

export default Logger;
