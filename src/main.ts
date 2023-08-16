import './style.css';
import {Router} from "./Router/Router";

const router: Router = new Router();

router.get(document.location.pathname);
