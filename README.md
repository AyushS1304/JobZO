# 🚀 JobZO

## 🎯 Description
**JobZO** is a modern job portal web application designed for recruiters and job seekers.  
It empowers job seekers to browse, search, and apply for their dream jobs, while providing recruiters a clean interface to post, manage, and track job listings.

**JobZO** helps you:
- Discover opportunities that fit your skills.
- Post jobs and manage applications.
- Save jobs you like.
- Manage hiring status in real time.

---

## 🖼️ Screenshot

![JobZO Screenshot](./227dfbd0-5ba4-4795-9320-e9416626907a.png)

---

## ⚡ Key Features
- ✅ User Authentication using Clerk
- ✅ Job Listing with Search, Filter by Location & Company
- ✅ Save / Unsave Jobs
- ✅ Apply to Jobs
- ✅ Manage Posted Jobs for Recruiters
- ✅ Update Hiring Status (Open / Closed)
- ✅ Delete Posted Jobs
- ✅ Responsive and Modern UI

---

## 🛠️ Tech Stack
- **Frontend**: React.js
- **Backend**: Supabase (Auth, Database, Storage)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## ⚙️ API Example
```js
import { getJobs, getSingleJob, saveJob, addNewJob } from "@/api/apiJobs";

// Fetch job listings
const jobs = await getJobs(token, { Location: "Delhi", searchQuery: "React" });

// View single job details
const job = await getSingleJob(token, { job_id: 1 });

// Save or Remove job from saved list
await saveJob(token, { alreadySaved: false }, { user_id, job_id, job });

// Add a new job (Recruiter)
await addNewJob(token, null, jobData);
