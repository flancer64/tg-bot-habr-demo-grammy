/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Demo_Back_Defaults {

    /* The bot command registry. */
    CMD = {
        HELP: 'help',
        SETTINGS: 'settings',
        START: 'start',
    };

    /** @type {Demo_Shared_Defaults} */
    SHARED;

    /**
     *
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {Demo_Shared_Defaults} SHARED
     */
    constructor(
        {
            Demo_Shared_Defaults$: SHARED,
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
