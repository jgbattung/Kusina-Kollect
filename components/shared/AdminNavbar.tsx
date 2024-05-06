import Link from "next/link"
import Image from "next/image"
import { SignOutButton } from "@clerk/nextjs"

function AdminNavbar() {
  return (
    <header className="top-0 left-0 right-0 flex flex-col border-b border-gray-200 py-3 shadow-sm max-md:py-2">
      <div className="flex flex-1 items-center justify-between px-20">
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            width={300}
            height={300}
          />
        </Link>
        <div className="flex items-center justify-between gap-4">
          <Link href='/'>
            <svg className="hover:fill-primary-800 transition-all" fill="#000" width="22px" height="22px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M31.772 16.043l-15.012-15.724c-0.189-0.197-0.449-0.307-0.721-0.307s-0.533 0.111-0.722 0.307l-15.089 15.724c-0.383 0.398-0.369 1.031 0.029 1.414 0.399 0.382 1.031 0.371 1.414-0.029l1.344-1.401v14.963c0 0.552 0.448 1 1 1h6.986c0.551 0 0.998-0.445 1-0.997l0.031-9.989h7.969v9.986c0 0.552 0.448 1 1 1h6.983c0.552 0 1-0.448 1-1v-14.968l1.343 1.407c0.197 0.204 0.459 0.308 0.722 0.308 0.249 0 0.499-0.092 0.692-0.279 0.398-0.382 0.411-1.015 0.029-1.413zM26.985 14.213v15.776h-4.983v-9.986c0-0.552-0.448-1-1-1h-9.965c-0.551 0-0.998 0.445-1 0.997l-0.031 9.989h-4.989v-15.777c0-0.082-0.013-0.162-0.032-0.239l11.055-11.52 10.982 11.507c-0.021 0.081-0.036 0.165-0.036 0.252z"></path>
            </svg>
          </Link>
          <SignOutButton>
            <svg className="hover:fill-primary-800" height="22px" width="22px" version="1.1" id="XMLID_173_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26">
              <g id="logout">
                <g>
                  <path d="M15,24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4,18.7L17,17.3l3.3-3.3H5v-2h15.3L17,8.7l1.4-1.4L24,13L18.4,18.7z"/>
                </g>
              </g>
            </svg>
          </SignOutButton>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar