import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const user1 = await prisma.user.create({
    data: {
      login: 'first user..',
      password: 'first password',
      version: 1,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      login: 'user N2',
      password: 'password 2 very strong',
      version: 1,
    },
  });

  console.log('created users: ', user1, user2);
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
