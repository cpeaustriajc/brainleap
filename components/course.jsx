import Link from "next/link"

export function Course() {
    return (
        <Link href="/course/cpe314">
            <div className="border">
                <h2 className="font-bold">Course Title</h2>
            </div>
        </Link>
    )
}
