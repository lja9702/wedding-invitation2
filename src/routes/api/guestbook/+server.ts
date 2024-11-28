import { json, error } from '@sveltejs/kit';
import { getGuestbookCollection } from '$lib/mongo';
import { Timestamp, ObjectId } from 'mongodb';
import { sendMail } from '$lib/mail';
import * as bcrypt from 'bcrypt';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	const collection = await getGuestbookCollection();
	const guestbooks = await collection.find().toArray();
	guestbooks.forEach((g) => delete g.password);
	return json({
		guestbooks
	});
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request }) {
	const collection = await getGuestbookCollection();
	let guestbook = await request.json();
	guestbook.date = Date.now();

	// modify guestbook
	if (guestbook._id) {
		const objId = new ObjectId(guestbook._id);
		const cguestbook = await collection.find({ _id: objId }).next();

		// match password
		if (bcrypt.compareSync(guestbook.password, cguestbook.password)) {
			delete guestbook._id;
			delete guestbook.password;
			await collection.updateOne({ _id: objId }, { $set: guestbook });

		} else {
			throw error(400, {
				message: '잘못된 입력'
			});
		}

	// insert guestbook
	} else {
		guestbook.password = bcrypt.hashSync(guestbook.password, 10);
		let res = await collection.insertOne(guestbook);
		guestbook._id = res.insertedId;
	}
	// FIXME: 메일 수신 받을거면 사용.
	// try {
	// 	await sendMail(guestbook);
	// } catch (e) {
	// 	console.log(e);
	// }
	delete guestbook.password;
	return json({ guestbook });
}
