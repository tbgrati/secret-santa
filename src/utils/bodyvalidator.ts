import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

function BodyValidator<T extends object>(dtoClass: new () => T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const output = plainToInstance(dtoClass, req.body);
        validate(output).then(errors => {
            if (errors.length > 0) {
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: errors,
                });
            } else {
                req.body = output;
                next();
            }
        }).catch(err => {
            return res.status(500).json({ message: 'Server error', err });
        });
    };
}

export default BodyValidator;
