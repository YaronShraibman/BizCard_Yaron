import Joi from "joi";
import { ICardUpdate } from "../db/types/db";


const schema = Joi.object<ICardUpdate>({
    title: Joi.string().required(),
});

export { schema as joiUpdateCardSchema };
export default schema;
