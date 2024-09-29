import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface UserAvatarProps {
    name?: string | null;
    image?: string | null;
}

const UserAvatar = ({ image, name }: UserAvatarProps) => {
    return (
        <Avatar>
            {/* @ts-expect-error - type */}
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name?.split("")[0]}</AvatarFallback>
        </Avatar>
    )
}

export { UserAvatar }