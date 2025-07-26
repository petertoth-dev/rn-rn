import {logger, consoleTransport, configLoggerType, transportFunctionType} from 'react-native-logs';

// TODO: Implement FireBase
// import crashlytics from '@react-native-firebase/crashlytics';
// import {transportFunctionType} from 'react-native-logs/src';
// const crashlyticsTransport:transportFunctionType<any> = async (props: {
//     msg: any;
//     rawMsg: any;
//     level: { severity: number; text: string };
//     extension?: string | null;
//     options?: any;
// }) => {
//     crashlytics().log(`[${props.extension || ' '}] ${props.level}: ${props.msg}`);
// };

export const AnsiColors = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    grey: '\x1b[90m',
    redBright: '\x1b[91m',
    greenBright: '\x1b[92m',
    yellowBright: '\x1b[93m',
    blueBright: '\x1b[94m',
    magentaBright: '\x1b[95m',
    cyanBright: '\x1b[96m',
    whiteBright: '\x1b[97m',
};

type ConsoleTransportOptions = {
    colors?: Record<string, keyof typeof AnsiColors>;
    extensionColors?: Record<string, keyof typeof AnsiColors>;
};

const defaultConfig:configLoggerType<transportFunctionType<ConsoleTransportOptions>, 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'critical'> = {
    levels: {
        trace:    0,
        debug:    1,
        info:     2,
        warn:     3,
        error:    4,
        critical: 5,
    },
    severity: 'trace',
    //transport: APP_ENV === 'development' ? consoleTransport : crashlyticsTransport,
    transport: consoleTransport, // TODO: Change production to Firebase
    transportOptions: {
        colors: {
            trace: 'grey',
            debug: 'whiteBright',
            info: 'blueBright',
            warn: 'yellowBright',
            error: 'redBright',
            critical: 'red',
        },
        extensionColors: {
            root:   'grey',
            App:    'white',
            UI:     'magentaBright',
            API:     'green',
        },
    },
    formatFunc: (level: string, extension: string | null, messages: any) => {
        const levelColorKey = defaultConfig.transportOptions?.colors?.[level];
        const levelColor = AnsiColors[levelColorKey as keyof typeof AnsiColors] || '';
        const reset = '\x1b[0m';

        const formattedMsgs = messages.map((message: any) =>
            typeof message === 'object'
                ? levelColor + JSON.stringify(message, null, 2) + reset
                : levelColor + String(message) + reset
        ).join(' ');

        return extension ? `${extension} ${formattedMsgs}` : formattedMsgs;
    },
    async: true,
    printDate: false,
    dateFormat: 'time',
    printLevel: true,
    fixedExtLvlLength: false,
    enabled: true,
};

export const log = logger.createLogger(defaultConfig);
export const logUI = log.extend('UI');
export const logApp = log.extend('App');
export const logNavigation = log.extend('Nav');
export const logAPI = log.extend('API');

