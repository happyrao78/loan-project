import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Add = ({ token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [roles, setRoles] = useState("");
    const [benefits, setBenefits] = useState("");
    const [teamPosition, setTeamPosition] = useState("Executive");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name,
                description,
                rolesAndResponsibilities: roles, // API expects 'rolesAndResponsibilities'
                benefits,
                position: teamPosition, // API expects 'position'
            };

            const response = await axios.post(`${backendUrl}/api/jobs/add`, payload, {
                headers: {
                    token,
                    "Content-Type": "application/json", // Ensure JSON format
                },
            });

            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setRoles("");
                setBenefits("");
                setTeamPosition("Executive");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <div className='flex flex-col w-full items-start gap-3'>

                {/* Team Selection */}
                <div className='flex gap-5'>
                    <div>
                        <p className='mb-2'>Select Bank</p>
                        <select className='w-full px-3 py-2' onChange={(e) => setName(e.target.value)} value={name} required>
                            <option value="">Select a team</option>
                            <option value="Events">Events</option>
                            <option value="Outreach">Outreach</option>
                            <option value="Content">Content</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Hr">Hr</option>
                            <option value="Media">Media</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Graphics">Graphics</option>
                            <option value="Technical">Technical</option>
                        </select>
                    </div>

                    {/* Team Position */}
                    <div>
                        <p className='mb-2'>Enter Team Position</p>
                        <select className='w-full px-3 py-2' onChange={(e) => setTeamPosition(e.target.value)} value={teamPosition} required>
                            <option value="Executive">Executive</option>
                            <option value="Head">Head</option>
                            <option value="Lead">Lead</option>
                        </select>
                    </div>
                </div>

                {/* Team Description */}
                {/* <div className='w-full'>
                    <p className='mb-2'>Enter Team Description</p>
                    <textarea placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2'
                        onChange={(e) => setDescription(e.target.value)} value={description} />
                </div> */}

                {/* Roles and Responsibilities */}
                {/* <div className='w-full'>
                    <p className='mb-2'>Enter Roles and Responsibilities</p>
                    <textarea placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2'
                        onChange={(e) => setRoles(e.target.value)} value={roles} />
                </div> */}

                {/* Benefits */}
                {/* <div className='w-full'>
                    <p className='mb-2'>Enter Benefits</p>
                    <textarea placeholder='Write content here' required className='w-full max-w-[500px] px-3 py-2'
                        onChange={(e) => setBenefits(e.target.value)} value={benefits} />
                </div> */}

            </div>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>Add Team</button>
        </form>
    );
}

export default Add;
