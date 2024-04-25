class RoomDto {
    id;
    topic;
    roomType;
    speakers;
    ownerId;
    createdAt;
    isDeletable;

    constructor(room) {
        this.id = room._id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId = room.ownerId;
        this.speakers = room.speakers;
        this.createdAt = room.createdAt;
        this.isDeletable = room.isDeletable;
    }
}
module.exports = RoomDto;