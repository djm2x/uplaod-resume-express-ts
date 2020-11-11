import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id = 0;

    @Column('text', { nullable: true })
    nom = '';

    @Column('text', { nullable: true })
    prenom = '';

    @Index({ unique: true })
    @Column('text')
    email = '';

    @Column('text')
    password = '';

    @Column('tinyint')
    isActive = true;

    @Column('datetime')
    date = new Date();

    @Column('varchar')
    imageUrl = '';

    @Column('text', { nullable: true })
    role = '';

    // @BeforeInsert()
    // async setPassword(password: string) {
    //     const salt = await bcrypt.genSalt()
    //     this.password = await bcrypt.hash(password || this.password, salt)
    // }
}

@Entity('discussions')
export class Discussion {

    @PrimaryGeneratedColumn()
    id = 0;

    @Column('int')
    unReaded = 0;

    @Column('datetime')
    date = new Date();

    @Column('int')
    idSender = 0;

    @Column('int')
    idReceiver = 0;

    @ManyToOne(type => User, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idSender" })
    sender = new User();

    @ManyToOne(type => User, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idReceiver" })
    receiver = new User();

    @OneToMany(type => Message, e => e.discussion)
    messages: Message[];

}

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn()
    id = 0;

    @Column('varchar')
    object = '';

    @Column('varchar')
    message = '';

    @Column('tinyint')
    vu = false;

    @Column('datetime')
    date = new Date();

    @Column('varchar')
    receiverName = '';

    @Column('varchar')
    receiverImage = '';

    @Column('int')
    idSender = 0;

    @Column('int')
    idReceiver = 0;

    @Column('int')
    idDiscussion = 0;

    @ManyToOne(type => User, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idSender" })
    sender = new User();

    @ManyToOne(type => User, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idReceiver" })
    receiver = new User();

    @ManyToOne(type => User, null, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "idDiscussion" })
    discussion = new Discussion();
}

