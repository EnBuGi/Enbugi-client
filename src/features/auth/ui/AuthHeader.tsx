import { Text } from "@/shared/components/ui/Text";
import Image from "next/image";

export function AuthHeader() {
    return (
        <div className="flex items-center justify-center flex-row text-center space-x-3">
             <div className="flex justify-center mb-2">
                <Image 
                    src="/logo.svg" 
                    alt="En# Logo" 
                    width={50} 
                    height={50} 
                    priority
                />
            </div>
            <div>
                <Text variant="h4" className="text-white">En# Online Judge</Text>
            </div>
        </div>
    );
}
