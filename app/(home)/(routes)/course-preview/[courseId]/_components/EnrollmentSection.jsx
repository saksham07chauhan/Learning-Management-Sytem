import React from 'react'
import { EnrollCourse, PublishCourse } from '../../../../../_services';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function EnrollmentSection({courseDetail,userCourse}) {
    const {user}=useUser();
    const router=useRouter();
    const enrollCourse=async()=>{
        if(user)
        {
        await EnrollCourse(courseDetail.id,user.primaryEmailAddress.emailAddress)
        .then(async(resp)=>{
            console.log("EnrollCourseResp=>",resp);
            if(resp)
            {
                await PublishCourse(resp?.createUserEnrollCourse?.id)
                .then(result=>{
                    console.log(result);
                    if(result)
                    {
                        router.push('/view-course/'+courseDetail.id)
                    }
                })
            }
        })
    }
    else{
        router.push('/sign-in');
    }
}
  return (
    <div>
        {userCourse?.courseId?
        <div className='mt-5 border rounded-lg p-2 text-center'>
        <h1 className='text-gray-500'>Continue to Learn a In-Demand Technologies With Resume Ready Capstone Project</h1>
        <button 
        className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2
        hover:bg-purple-700'
        onClick={()=> router.push('/view-course/'+courseDetail.id)}
        >Continue</button>
    </div>:null
        }
        {courseDetail.free&&!userCourse?.courseId? 
        <div className='mt-5 border rounded-lg p-2 text-center'>
            <h1 className='text-gray-500'>Learn a In-Demand Technologies With Resume Ready Capstone Project</h1>
            <button 
s            className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2
            hover:bg-purple-700'
            onClick={()=>enrollCourse()}>Enroll Now</button>
        </div>
        :!userCourse?.courseId?<div className='mt-5 border rounded-lg p-2 text-center'>
            <h1 className='text-gray-500'>Learn to build entire web applications from start to finish on one of the most versatile tech stacks : MongoDB, Express.js, React.js and Node.js and many More (MERN stack)</h1>
            <button 
            className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2
            hover:bg-purple-700'>Enroll Now for  $14.99</button>
        </div>:null}

        <div className='mt-5 border rounded-lg p-2 text-center'>
            <h1 className='text-gray-500'>Buy Membership And Get Access To Our Exculusive Courses With 1:1 live Sessions </h1>
            <button 
            className='p-2 w-full bg-purple-500 text-white rounded-lg text-[14px] mt-2
            hover:bg-purple-700'>Subscribe for $3.99/Month</button>
        </div>
    </div>
  )
}

export default EnrollmentSection;