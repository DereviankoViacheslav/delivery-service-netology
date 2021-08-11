const UserDB = process.env.DB_USERNAME || '';
const PasswordDB = process.env.DB_PASSWORD || '';
const NameDB = process.env.DB_NAME || 'delivery-service-netology';
const HostDb = process.env.MONGO_URL || `mongodb://localhost:27017/${NameDB}`;

module.exports = {
  host: HostDb,
  user: UserDB,
  pass: PasswordDB,
  dbName: NameDB,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
