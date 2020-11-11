export class User {
  id = 0;
  nom = '';
  prenom = '';
  email = '';
  password = '';
  isActive = true;
  date = new Date();
  imageUrl = '';
  role = '';
}

export class Discussion {
  id = 0;
  unReaded = 0;
  date = new Date();

  idSender = 0;
  idReceiver = 0;
  sender = new User();
  receiver = new User();
  messages: Message[] = [];
}

export class Message {
  id = 0;
  object = 'Lorem ipsum dolor sit amet.';
  message = 'Lorem ipsum dolor sit amet.';
  vu = false;
  date = new Date();
  idCours = 0;
  otherUserName = '';
  otherUserImage = '';

  idSender = 0;
  idReceiver = 0;
  idDiscussion = 0;

  sender = new User();
  receiver = new User();
  discussion = new Discussion();
}
