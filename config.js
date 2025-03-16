
import{createConnection, CreatePool} from 'mysql2'

constconfig = CreatePool({
host:'127.0.0.1',
user:'root',
password:'110798',
database:'biblioteca2025',
port:3306,
enablekeepalive:true,
keepAliveInitialDelay:true})
export{config}
  