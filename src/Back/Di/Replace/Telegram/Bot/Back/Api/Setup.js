/**
 * Display the messages about the processing of an API request.
 */
// IMPORTS

// CLASSES
/**
 * @implements {Telegram_Bot_Back_Api_Setup}
 */
export default class Demo_Back_Di_Replace_Telegram_Bot_Back_Api_Setup {
    /**
     * @param {Demo_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {Demo_Back_Bot_Cmd_Help} cmdHelp
     * @param {Demo_Back_Bot_Cmd_Settings} cmdSettings
     * @param {Demo_Back_Bot_Cmd_Start} cmdStart
     * @param {Demo_Back_Bot_Filter_Message} filterMessage
     */
    constructor(
        {
            Demo_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            Demo_Back_Bot_Cmd_Help$: cmdHelp,
            Demo_Back_Bot_Cmd_Settings$: cmdSettings,
            Demo_Back_Bot_Cmd_Start$: cmdStart,
            Demo_Back_Bot_Filter_Message$: filterMessage,
        }
    ) {
        // VARS
        const CMD = DEF.CMD;

        // INSTANCE METHODS
        this.commands = async function (bot) {

            const cmdDef = [
                {command: CMD.HELP, description: 'Display help text'},
                {command: CMD.SETTINGS, description: 'Open settings'},
                {command: CMD.START, description: 'Start the bot'},
            ];
            await bot.api.setMyCommands(cmdDef);
            logger.info(`Total ${cmdDef.length} commands are set for the bot (default).`);
            const cmdRu = [
                {command: CMD.HELP, description: 'Показать справку'},
                {command: CMD.SETTINGS, description: 'Открыть настройки'},
                {command: CMD.START, description: 'Начать работу'},
            ];
            await bot.api.setMyCommands(cmdRu, {language_code: 'ru'});
            logger.info(`Total ${cmdRu.length} commands are set for the bot (ru).`);
            return bot;
        };

        this.handlers = function (bot) {
            bot.command(CMD.HELP, cmdHelp);
            bot.command(CMD.SETTINGS, cmdSettings);
            bot.command(CMD.START, cmdStart);
            bot.on('message', filterMessage);
            return bot;
        };
    }
}
