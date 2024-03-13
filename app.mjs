/* no-console: "off" */
import 'dotenv/config'
import { app } from './src/api.mjs';



app.listen(3000, function(){
	console.log('running');
});
