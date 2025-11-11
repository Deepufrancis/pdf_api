import dotenv from 'dotenv'
dotenv.config();

// Validate and get env variable 
export const getEnvVariable = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        console.error(`Error: Environment variable '${name}' is not defined.`);
        process.exit(1);
    }
    return value;
};



