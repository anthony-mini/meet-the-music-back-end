import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../users/enums/role.enum';
import { Status } from '../users/enums/status.enum';
import { ArtistProfile } from '../artist-profile/entities/artist-profile.entity';

export class SeedingCreateArtist1716886147013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Créer l'utilisateur artiste

    const user = await queryRunner.manager.save(
      queryRunner.manager.create(User, {
        alias: 'johnny-hallyday',
        email: 'johnny@mail.fr',
        firstName: 'Johnny',
        lastName: 'Hallyday',
        password: 'johnnyHali123',
        phone: '0606060606',
        address: '12 rue de la paix',
        zipCode: '75000',
        city: 'Paris',
        role: Role.ARTIST,
        status: Status.ACTIVE,
        isVerifyEmail: true,
      }),
    );

    // Créer le profil artiste et l'associer à l'utilisateur créé
    await queryRunner.manager.save(
      queryRunner.manager.create(ArtistProfile, {
        user: user,
        description: 'Chanteur célèbre de rock et de pop.',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Supprimer l'utilisateur et le profil artiste
    await queryRunner.manager.delete(ArtistProfile, {
      user: { alias: 'johnny-hallyday' },
    });
    await queryRunner.manager.delete(User, { alias: 'johnny-hallyday' });
  }
}
