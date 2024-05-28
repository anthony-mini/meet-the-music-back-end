import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';
import { Status } from '../users/enums/status.enum';
import { ArtistProfile } from '../artist-profile/entities/artist-profile.entity';

export class SeedingCreateArtist1716886147013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const fakeArtists = [
      {
        alias: 'johnny-hallyday',
        email: 'johnny@mail.fr',
        firstName: 'Johnny',
        lastName: 'Hallyday',
        description:
          'Chanteur célèbre de rock et de pop, connu pour sa voix puissante et ses performances énergiques qui ont marqué plusieurs générations.',
      },
      {
        alias: 'amelie-dupont',
        email: 'amelie@mail.fr',
        firstName: 'Amélie',
        lastName: 'Dupont',
        description:
          'Chanteuse pop avec une voix douce et envoûtante, ses ballades romantiques sont appréciées par un large public.',
      },
      {
        alias: 'julien-martin',
        email: 'julien@mail.fr',
        firstName: 'Julien',
        lastName: 'Martin',
        description:
          'Rappeur talentueux avec des paroles engagées, il aborde des sujets sociaux importants dans ses chansons.',
      },
      {
        alias: 'clara-moreau',
        email: 'clara@mail.fr',
        firstName: 'Clara',
        lastName: 'Moreau',
        description:
          'Chanteuse de soul avec une voix profonde et émotive, elle touche le cœur de ses auditeurs à chaque note.',
      },
      {
        alias: 'louis-bernard',
        email: 'louis@mail.fr',
        firstName: 'Louis',
        lastName: 'Bernard',
        description:
          'Rockeur énergique avec des solos de guitare impressionnants, ses concerts sont des événements incontournables.',
      },
      {
        alias: 'marie-legrand',
        email: 'marie@mail.fr',
        firstName: 'Marie',
        lastName: 'Legrand',
        description:
          'Artiste électro avec des sons innovants, elle fait danser les foules dans les festivals de musique électronique.',
      },
      {
        alias: 'alexandre-roche',
        email: 'alexandre@mail.fr',
        firstName: 'Alexandre',
        lastName: 'Roche',
        description:
          'Héros de la scène hip-hop avec des performances spectaculaires, il est connu pour son charisme et son talent.',
      },
      {
        alias: 'emma-durand',
        email: 'emma@mail.fr',
        firstName: 'Emma',
        lastName: 'Durand',
        description:
          'Princesse de la pop avec des tubes à succès, elle est adorée par les jeunes du monde entier pour ses mélodies accrocheuses.',
      },
      {
        alias: 'nicolas-fournier',
        email: 'nicolas@mail.fr',
        firstName: 'Nicolas',
        lastName: 'Fournier',
        description:
          'Chanteur jazz avec des improvisations magistrales, il apporte une touche de sophistication à chaque performance.',
      },
      {
        alias: 'sophie-lambert',
        email: 'sophie@mail.fr',
        firstName: 'Sophie',
        lastName: 'Lambert',
        description:
          'Conteur folk avec des chansons traditionnelles, elle raconte des histoires captivantes à travers sa musique.',
      },
      {
        alias: 'pierre-duval',
        email: 'pierre@mail.fr',
        firstName: 'Pierre',
        lastName: 'Duval',
        description:
          'Roi du blues avec une guitare légendaire, ses chansons parlent de la vie et de l’amour avec une sincérité brute.',
      },
      {
        alias: 'juliette-renard',
        email: 'juliette@mail.fr',
        firstName: 'Juliette',
        lastName: 'Renard',
        description:
          'Star de la musique country avec un charisme naturel, ses concerts sont des événements mémorables.',
      },
      {
        alias: 'antoine-blanc',
        email: 'antoine@mail.fr',
        firstName: 'Antoine',
        lastName: 'Blanc',
        description:
          'Ambassadeur des vibrations reggae, sa musique est un appel à la paix et à l’amour, influençant de nombreux auditeurs.',
      },
      {
        alias: 'camille-noir',
        email: 'camille@mail.fr',
        firstName: 'Camille',
        lastName: 'Noir',
        description:
          'Artiste indie avec une approche unique, elle se distingue par son style original et ses compositions innovantes.',
      },
      {
        alias: 'lucas-riviere',
        email: 'lucas@mail.fr',
        firstName: 'Lucas',
        lastName: 'Rivière',
        description:
          'Rebelle punk avec une attitude audacieuse, il défie les conventions et inspire avec sa musique percutante.',
      },
      {
        alias: 'manon-perrier',
        email: 'manon@mail.fr',
        firstName: 'Manon',
        lastName: 'Perrier',
        description:
          'Soprano classique avec des compositions intemporelles, elle est respectée dans le monde entier pour son talent.',
      },
      {
        alias: 'victor-martinez',
        email: 'victor@mail.fr',
        firstName: 'Victor',
        lastName: 'Martinez',
        description:
          'Maître de la piste de danse avec des beats irrésistibles, il fait bouger tout le monde jusqu’au bout de la nuit.',
      },
      {
        alias: 'elise-roux',
        email: 'elise@mail.fr',
        firstName: 'Elise',
        lastName: 'Roux',
        description:
          "Diva de l'opéra avec une voix puissante et émotive, elle émeut son public avec chaque performance inoubliable.",
      },
      {
        alias: 'thomas-morel',
        email: 'thomas@mail.fr',
        firstName: 'Thomas',
        lastName: 'Morel',
        description:
          'Voix du gospel avec une passion débordante, il chante avec une ferveur qui touche les âmes de ses auditeurs.',
      },
      {
        alias: 'alice-dumont',
        email: 'alice@mail.fr',
        firstName: 'Alice',
        lastName: 'Dumont',
        description:
          "Star de l'EDM avec des sons futuristes, ses sets sont des expériences immersives qui captivent les foules.",
      },
      {
        alias: 'henri-petit',
        email: 'henri@mail.fr',
        firstName: 'Henri',
        lastName: 'Petit',
        description:
          'Rockeur alternatif avec un son unique, il mélange différents genres pour créer une musique nouvelle et innovante.',
      },
      {
        alias: 'lea-masson',
        email: 'lea@mail.fr',
        firstName: 'Léa',
        lastName: 'Masson',
        description:
          'Chanteuse trap avec des beats lourds et des paroles accrocheuses, elle domine les charts urbains avec son style.',
      },
      {
        alias: 'lucie-boucher',
        email: 'lucie@mail.fr',
        firstName: 'Lucie',
        lastName: 'Boucher',
        description:
          "Sensation R&B avec une voix suave, ses chansons parlent d'amour et de passion, captivant un large public.",
      },
      {
        alias: 'sebastien-perrin',
        email: 'sebastien@mail.fr',
        firstName: 'Sébastien',
        lastName: 'Perrin',
        description:
          'Idole K-Pop avec une base de fans dévouée, ses performances sont des spectacles impressionnants et inoubliables.',
      },
      {
        alias: 'charlotte-leroy',
        email: 'charlotte@mail.fr',
        firstName: 'Charlotte',
        lastName: 'Leroy',
        description:
          'Maître du grime avec des textes percutants, elle est un pilier de la scène underground avec une grande influence.',
      },
      {
        alias: 'guillaume-bell',
        email: 'guillaume@mail.fr',
        firstName: 'Guillaume',
        lastName: 'Bell',
        description:
          'Dieu du métal avec des riffs puissants et une présence scénique imposante, il domine la scène du métal.',
      },
      {
        alias: 'isabelle-garcia',
        email: 'isabelle@mail.fr',
        firstName: 'Isabelle',
        lastName: 'Garcia',
        description:
          'Reine du disco avec des grooves funky, elle fait danser les foules depuis des décennies avec son énergie.',
      },
      {
        alias: 'jean-renard',
        email: 'jean@mail.fr',
        firstName: 'Jean',
        lastName: 'Renard',
        description:
          'Sorcier de la techno avec des sets hypnotiques, il transporte le public dans une autre dimension musicale.',
      },
      {
        alias: 'sandra-hamel',
        email: 'sandra@mail.fr',
        firstName: 'Sandra',
        lastName: 'Hamel',
        description:
          'Artiste pop urbaine avec des rythmes entraînants et des paroles inspirantes, elle est proche de son public jeune.',
      },
      {
        alias: 'paul-chevalier',
        email: 'paul@mail.fr',
        firstName: 'Paul',
        lastName: 'Chevalier',
        description:
          'Chanteur folk avec une voix chaleureuse, il raconte des histoires à travers ses chansons, touchant les cœurs.',
      },
    ];

    for (const fakeArtist of fakeArtists) {
      const user = await queryRunner.manager.save(
        queryRunner.manager.create(User, {
          alias: fakeArtist.alias,
          email: fakeArtist.email,
          firstName: fakeArtist.firstName,
          lastName: fakeArtist.lastName,
          password: 'MegaPassword123',
          phone: '0123456789',
          address: '1 rue de la Musique',
          zipCode: '69001',
          city: 'Lyon 1er',
          role: Role.ARTIST,
          status: Status.ACTIVE,
          isVerifyEmail: true,
        }),
      );

      await queryRunner.manager.save(
        queryRunner.manager.create(ArtistProfile, {
          user: user,
          description: fakeArtist.description,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { role: Role.ARTIST });
  }
}
