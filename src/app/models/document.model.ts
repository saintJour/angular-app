export class Document {
    id: number;
    UserId: number;
    CourseId: number;
    name: string;
    description: string;
    type: string;
    year: number;
    rating: number;
    tags: string [];
    key: string;
    thumbnailKey: string;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
}