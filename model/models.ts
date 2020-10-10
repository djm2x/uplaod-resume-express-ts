import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    firstname = '';

    @Column('text')
    lastname = '';

    @Index({ unique: true })
    @Column('text')
    email = '';

    @Column('text')
    password = '';

    @Column('text')
    role = '';

    @OneToMany(type => UserParcoursVisite, va => va.user)
    userParcoursVisites: UserParcoursVisite[];

    @OneToMany(type => UserParcoursCree, va => va.user)
    userParcoursCrees: UserParcoursCree[];

    @OneToMany(type => Reponse, va => va.user)
    reponses: Reponse[];
}

@Entity('Parcours')
export class Parcours {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    titre = '';

    @Column('text')
    image = '';

    @Column('text')
    descriptif = '';

    @Column('text')
    temps = 0;

    @Column('integer')
    lat = 0;

    @Column('integer')
    lng = 0;

    @OneToMany(type => Etap, va => va.parcours)
    etaps: Etap[];

    @OneToMany(type => UserParcoursVisite, va => va.parcours)
    userParcoursVisites: UserParcoursVisite[];

    @OneToMany(type => UserParcoursCree, va => va.parcours)
    userParcoursCrees: UserParcoursCree[];
}

@Entity('UserParcoursVisite')
export class UserParcoursVisite {

    @PrimaryColumn('integer')
    userId = null;

    @PrimaryColumn('integer')
    parcoursId = null;

    @Column('date')
    date = new Date();

    @ManyToOne(type => User, a => a.userParcoursVisites, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(type => Parcours, a => a.userParcoursVisites, { onDelete: 'CASCADE' })
    parcours: Parcours;
}

@Entity('UserParcoursCree')
export class UserParcoursCree {

    @PrimaryColumn('integer')
    userId = null;

    @PrimaryColumn('integer')
    parcoursId = null;

    @Column('date')
    date = new Date();

    @ManyToOne(type => User, a => a.userParcoursCrees, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(type => Parcours, a => a.userParcoursCrees, { onDelete: 'CASCADE' })
    parcours: Parcours;
}

@Entity('Etap')
export class Etap {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    adresse = '';

    @Column('integer')
    lat = 0;

    @Column('integer')
    lng = 0;

    @Column('integer')
    parcoursId = 0;

    @ManyToOne(type => Parcours, a => a.etaps, { onDelete: 'CASCADE' })
    parcours: Parcours;

    @OneToMany(type => Quizz, va => va.etap)
    quizzs: Quizz[];
}

@Entity('Quizz')
export class Quizz {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    question = '';

    @Column('text')
    reponse = '';

    @Column('text')
    choix = '';

    @Column('integer')
    etapId = 0;

    @ManyToOne(type => Etap, a => a.quizzs, { onDelete: 'CASCADE' })
    etap: Etap;

    @OneToMany(type => Reponse, va => va.quizz)
    reponses: Reponse[];
}

@Entity('Reponse')
export class Reponse {

    @PrimaryGeneratedColumn()
    id = null;

    @Column('text')
    reponse = '';

    @Column('integer')
    quizzId = 0;

    @Column('date')
    date = new Date();

    @Column('integer')
    userId = 0;

    @ManyToOne(type => Quizz, a => a.reponses, { onDelete: 'CASCADE' })
    quizz: Quizz;

    @ManyToOne(type => User, va => va.reponses)
    user: User;
}
