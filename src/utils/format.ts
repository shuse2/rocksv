export const bufferToString = (message: Buffer, option: string): string => {
    switch(option) {
        case 'hex':
            return message.toString('hex');
        case 'base64':
            return message.toString('base64');
        case 'string':
            return String(message);
        default:
            throw new Error('Invalid format option');
    }
}

const isASCIIChar = (val: string): boolean =>
    /^[\x21-\x7F]*$/.test(val);

const smartConvert = (message: string, delimiter: string, format: string): string =>
    message.split(delimiter).map(s => {
        if (isASCIIChar(s)) {
            return s;
        }
        return Buffer.from(s, 'binary').toString(format);
    }).join(delimiter)

export const bufferToStringWithDelimiter = (message: Buffer, delimiter: string, option: string): string => {
    const stringMessage = message.toString('binary');
    switch (option) {
        case 'smart-hex':
            return smartConvert(stringMessage, delimiter, 'hex');
        case 'smart-base64':
            return smartConvert(stringMessage, delimiter, 'base64');
        case 'string':
            return stringMessage;
        default:
            throw new Error('Invalid format option');
    }
}

// blocks:b{}:h{}
export const parseKey = (message: string): string => {
    let result = message;
    result = result.replace(/h{(.*?)}/g, val => {
        // Remove "h{" and "}"
        const sliced = val.slice(2, val.length);
        return Buffer.from(sliced, 'hex').toString('binary');
    });
    result = result.replace(/b{(.*?)}/g, val => {
        // Remove "b{" and "}"
        const sliced = val.slice(2, val.length);
        return Buffer.from(sliced, 'base64').toString('binary');
    });
    result = result.replace(/i{(.*?)}/g, val => {
        // Remove "d{" and "}"
        const sliced = val.slice(2, val.length - 1);
        const num = Number(sliced);
        if (Number.isNaN(num)) {
            throw new Error(`${sliced} is not a number`);
        }
        const buf = Buffer.alloc(4);
        buf.writeUInt32BE(num, 0);
        return buf.toString('binary');
    });
    result = result.replace(/d{(.*?)}/g, val => {
        // Remove "d{" and "}"
        const sliced = val.slice(2, val.length);
        const num = BigInt(sliced);
        const buf = Buffer.alloc(8);
		buf.writeBigUInt64BE(num);
        return buf.toString('binary');
    });
    return result;
}