import bcrypt from 'bcrypt';

import prisma from '@/prisma';

const hashPassword = async (enteredPassword: string) => {
	const saltRounds = await bcrypt.genSalt(10);
	return bcrypt.hashSync(enteredPassword, saltRounds);
};

async function main() {
	// Create roles
	const adminRole = await prisma.role.create({
		data: {
			name: 'admin',
			permissions: {
				create: [{ name: 'create_user' }, { name: 'delete_user' }],
			},
		},
	});

	const userRole = await prisma.role.create({
		data: {
			name: 'user',
			permissions: {
				create: [{ name: 'view_profile' }],
			},
		},
	});

	// Create users
	await prisma.user.create({
		data: {
			firstName: 'John',
			lastName: 'Doe',
			avatar: 'https://avatar.iran.liara.run/public/25',
			email: 'john.doe@example.com',
			password: await hashPassword('superUser123'),
			isVerified: true,
			roleId: adminRole.id,
		},
	});

	await prisma.user.create({
		data: {
			firstName: 'Jane',
			lastName: 'Doe',
			avatar: 'https://avatar.iran.liara.run/public/82',
			email: 'jane.doe@example.com',
			password: await hashPassword('hashedPassword456'),
			isVerified: true,
			roleId: userRole.id,
		},
	});
}

main()
	.catch((e) => {
		throw Error(`Error during seed: ${e}`);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
