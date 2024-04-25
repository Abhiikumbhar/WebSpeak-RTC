const RoomDto = require('../dtos/room.dto');
const roomService = require('../services/room-service');

class RoomsController {
    async create(req, res) {
        // room
        const { topic, roomType , isDeletable} = req.body;

        if (!topic || !roomType) {
            return res
                .status(400)
                .json({ message: 'All fields are required!' });
        }

        const room = await roomService.create({
            topic,
            roomType,
            isDeletable,
            ownerId: req.user._id,
        });

        return res.json(new RoomDto(room));
    }

    async index(req, res) {
        await roomService.deleteRoomsOlderThanOneMonth();
        const rooms = await roomService.getAllRooms(['open','social','private']);
        const allRooms = rooms.map((room) => new RoomDto(room));
        return res.json(allRooms);
    }

    async show(req, res) {
        const room = await roomService.getRoom(req.params.roomId);

        return res.json(room);
    }
}

module.exports = new RoomsController();
