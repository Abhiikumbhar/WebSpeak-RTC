const RoomModel = require('../models/room-model');
class RoomService {
    async create(payload) {
        const { topic, roomType, ownerId, isDeletable } = payload;
        const room = await RoomModel.create({
            topic,
            roomType,
            ownerId,
            isDeletable,
            speakers: [ownerId],
        });
        return room;
    }

    async getAllRooms(types) {
        const rooms = await RoomModel.find({ roomType: { $in: types } })
            .populate('speakers')
            .populate('ownerId')
            .exec();
        return rooms;
    }

    async getRoom(roomId) {
        const room = await RoomModel.findOne({ _id: roomId });
        return room;
    }

    async deleteRoomsOlderThanOneMonth() {
        try {
            // Calculate date 1 month ago
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            // Find and delete rooms that are older than 1 month and isDeletable is true
            const result = await RoomModel.deleteMany({
                isDeletable: true,
                createdAt: { $lt: oneMonthAgo }
            });
            if (result.deletedCount > 0) {
                console.log(`${result.deletedCount} rooms were deleted from the database that are older than 1 month.`);
            } else {
                console.log('No rooms are older than 1 month.');
            }
        } catch (error) {
            console.error('Error occurred while deleting rooms:', error);
        }
    }
}
module.exports = new RoomService();