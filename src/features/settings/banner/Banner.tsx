import React from 'react'

type Props = {}

function Banner({}: Props) {
  return (
    <div className="bg-softBeige rounded-md h-28 grid grid-cols-12 gap-4 ">
        <div className="ms-2 p-2 col-span-5 text-center mt-3">
          <div className="">
            <p className="bg-gray p-1 text-yellow-50 rounded-md w-28">
              Organization
            </p>
          </div>

          <div className="flex mt-3">
            <p className="mt-1">
              <b>Tech Electronics</b>
            </p>{" "}
            {
              <div className="ms-3 bg-white rounded-md p-1">
                ID:
              </div>
            }
          </div>
        </div>

        <div className="col-span-7 flex items-end justify-end">
          <img
            src="https://i.postimg.cc/SxSLnWZR/Group-37.png"
            className="h-28"
            alt=""
          />
        </div>
      </div>
  )
}

export default Banner