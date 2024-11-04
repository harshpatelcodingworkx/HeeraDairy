import {
	DocId,
	IUser,
	RequestType,
	ResponseType,
} from "../interfaces/appInterfaces"
import { user } from "../models/user"

const getUserData = async (
	req: RequestType<unknown, unknown, DocId>,
	res: ResponseType<unknown, unknown>
) => {
	const id = req.params.id
	const { firstName, lastName, phoneNo, userType } = req.user

	if (!id) {
		return res.status(200).json({
			status: "Success",
			result: {
                firstName,
                lastName,
                phoneNo,
                userType,
            },
		})
	}
	const userDetail = await user.findById(
		id,
		"firstName lastName phoneNo userType"
	);

	return res.status(200).json({
		status: "Success",
		result: userDetail,
	})
}

export { getUserData }
