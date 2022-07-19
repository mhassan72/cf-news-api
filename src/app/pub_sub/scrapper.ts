// import { fireStore } from '../../database'
import Sites from '../controllers/scrapper/sites';
export default async function scrapper (context: any)  {
    Sites()
    return null;
}