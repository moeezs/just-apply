import { ApifyClient } from 'apify-client';

export async function POST(request: Request) {
    const { url } = await request.json();
    
    // Extract username from LinkedIn URL
    const username = url;

    // Initialize the ApifyClient with API token
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    // Prepare Actor input
    const input = {
        "username": username
    };

    const run = await client.actor("VhxlqQXRwhW8H5hNV").call(input);


    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return new Response(JSON.stringify(items), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    // const temp = [
    //     {
    //         "basic_info": {
    //             "fullname": "Abdul Moeez Shaikh",
    //             "first_name": "Abdul Moeez",
    //             "last_name": "Shaikh",
    //             "headline": "CS @ McMaster University",
    //             "public_identifier": "abdulmoeezshaikh",
    //             "profile_picture_url": "https://media.licdn.com/dms/image/v2/D4E03AQHsowoG0ehl5A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732596760159?e=1753315200&v=beta&t=BVnxL7Pltcheh0hHEP7aSMemEFsGpk3mC9ePO3i1uGs",
    //             "about": "Hi! I am Moeez, an incoming Computer Science student at McMaster University in Hamilton, ON. I have a keen interest in machine learning and full stack web development.",
    //             "location": {
    //                 "country": "Canada",
    //                 "city": "Mississauga, Ontario",
    //                 "full": "Mississauga, Ontario, Canada",
    //                 "country_code": "CA"
    //             },
    //             "creator_hashtags": [],
    //             "is_creator": false,
    //             "is_influencer": false,
    //             "is_premium": false,
    //             "created_timestamp": 1512837913698,
    //             "show_follower_count": false,
    //             "background_picture_url": null,
    //             "urn": "ACoAACUtPHoBp7mRSf-bVO9AHrHZfrGFwy5JBko",
    //             "follower_count": 808,
    //             "connection_count": 807,
    //             "current_company": "Zebra Robotics",
    //             "current_company_urn": "10276809",
    //             "current_company_url": "https://www.linkedin.com/company/zebra-robotics-inc."
    //         },
    //         "experience": [
    //             {
    //                 "title": "Instructor",
    //                 "company": "Zebra",
    //                 "location": "On-site",
    //                 "duration": "Feb 2025 - Present · 4 mos",
    //                 "start_date": {
    //                     "year": 2025,
    //                     "month": "Feb"
    //                 },
    //                 "is_current": true,
    //                 "company_linkedin_url": "https://www.linkedin.com/company/10276809/",
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQFV5E897tSSKw/company-logo_400_400/company-logo_400_400/0/1663364684258/zebra_robotics_inc_logo?e=1753315200&v=beta&t=WT2HKEuu1rGtTQf2xiEjwBAUHpdTIbzpuHDXFXxEoHo",
    //                 "employment_type": "Robotics",
    //                 "company_id": "10276809"
    //             },
    //             {
    //                 "title": "Software Team Member",
    //                 "company": "McMaster",
    //                 "duration": "Jan 2025 - Present · 5 mos",
    //                 "start_date": {
    //                     "year": 2025,
    //                     "month": "Jan"
    //                 },
    //                 "is_current": true,
    //                 "company_linkedin_url": "https://www.linkedin.com/company/105275245/",
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQEmS9j_x0zvkg/company-logo_400_400/company-logo_400_400/0/1734968030880?e=1753315200&v=beta&t=4sRrlJW2Qmc3pDfTf5IEsBXfnrGtGEMGefVyuXyovKw",
    //                 "employment_type": "Aerial Robotics & Drones Club",
    //                 "company_id": "105275245"
    //             },
    //             {
    //                 "title": "Software Team Member",
    //                 "company": "McMaster",
    //                 "location": "Hamilton, Ontario, Canada",
    //                 "duration": "Jan 2025 - Present · 5 mos",
    //                 "start_date": {
    //                     "year": 2025,
    //                     "month": "Jan"
    //                 },
    //                 "is_current": true,
    //                 "company_linkedin_url": "https://www.linkedin.com/company/105640977/",
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQF_7ytM3GbRmA/company-logo_400_400/company-logo_400_400/0/1738203825842/mcmaster_robo_sub_logo?e=1753315200&v=beta&t=akDVgG1B41r2KQXIK-DowlFe312x1KR4rJ2RORe_Eco",
    //                 "employment_type": "Robo Sub",
    //                 "company_id": "105640977"
    //             },
    //             {
    //                 "title": "Lead Programmer",
    //                 "company": "FIRST",
    //                 "duration": "Sep 2022 - Apr 2024 · 1 yr 8 mos",
    //                 "start_date": {
    //                     "year": 2022,
    //                     "month": "Sep"
    //                 },
    //                 "end_date": {
    //                     "year": 2024,
    //                     "month": "Apr"
    //                 },
    //                 "is_current": false,
    //                 "company_linkedin_url": "https://www.linkedin.com/company/5283870/",
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/C4D0BAQFjDBJ4qmJxLg/company-logo_400_400/company-logo_400_400/0/1631320827997?e=1753315200&v=beta&t=8T5CU-o72Xy2Cuqgjj-huvSjpAlKRNAASLVnV-2r9r8",
    //                 "employment_type": "Robotics Canada",
    //                 "company_id": "5283870"
    //             },
    //             {
    //                 "title": "iOS App Developer",
    //                 "company": "Career",
    //                 "duration": "Jul 2023 - Aug 2023 · 2 mos",
    //                 "start_date": {
    //                     "year": 2023,
    //                     "month": "Jul"
    //                 },
    //                 "end_date": {
    //                     "year": 2023,
    //                     "month": "Aug"
    //                 },
    //                 "is_current": false,
    //                 "company_linkedin_url": "https://www.linkedin.com/company/9413311/",
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/D4E0BAQGgp-DqE79D7A/company-logo_400_400/company-logo_400_400/0/1665074245583/career_education_council_logo?e=1753315200&v=beta&t=gu17Bjltx5tdAgJczxKWOKl_k_QOULUQ-a13szfrdI8",
    //                 "employment_type": "Education Council",
    //                 "skills": [
    //                     "Xcode",
    //                     "iPhone Application Development"
    //                 ],
    //                 "company_id": "9413311",
    //                 "skills_url": "https://www.linkedin.com/in/abdulmoeezshaikh/overlay/urn:li:fsd_profilePosition:(ACoAACUtPHoBp7mRSf-bVO9AHrHZfrGFwy5JBko,2239051606)/skill-associations-details?profileUrn=urn%3Ali%3Afsd_profile%3AACoAACUtPHoBp7mRSf-bVO9AHrHZfrGFwy5JBko"
    //             },
    //             {
    //                 "title": "Promotional Representative",
    //                 "company": "Liberal Party of Canada • Parti Libéral du Canada",
    //                 "duration": "Aug 2021 - Sep 2021 · 2 mos",
    //                 "start_date": {
    //                     "year": 2021,
    //                     "month": "Aug"
    //                 },
    //                 "end_date": {
    //                     "year": 2021,
    //                     "month": "Sep"
    //                 },
    //                 "is_current": false,
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/D4E0BAQGy3aLxtEOm5g/company-logo_400_400/company-logo_400_400/0/1725372469056/liberal_party_of_canada_logo?e=1753315200&v=beta&t=jZjxpLpA-2_casYtcev5VhorW_AjIQttt2GEbwhWPGo",
    //                 "company_id": "1295257"
    //             },
    //             {
    //                 "title": "Volunteer",
    //                 "company": "Muslim Welfare Centre (Food Bank)",
    //                 "duration": "Aug 2021 - Jul 2022 · 1 yr",
    //                 "start_date": {
    //                     "year": 2021,
    //                     "month": "Aug"
    //                 },
    //                 "end_date": {
    //                     "year": 2022,
    //                     "month": "Jul"
    //                 },
    //                 "is_current": false,
    //                 "company_logo_url": "https://media.licdn.com/dms/image/v2/C560BAQHRfnTr7kuw_g/company-logo_400_400/company-logo_400_400/0/1675295975534/muslim_welfare_centre_food_bank__logo?e=1753315200&v=beta&t=jhNBaID8ammYweEdU1jy-nDaea_u0gYkk8F3QyaNwMo",
    //                 "company_id": "57283013"
    //             }
    //         ],
    //         "education": [
    //             {
    //                 "school": "McMaster University",
    //                 "degree": "Bachelor of Applied Science - BASc, Computer Science",
    //                 "duration": "Jul 2024 - Apr 2029",
    //                 "school_linkedin_url": "https://www.linkedin.com/company/164897/",
    //                 "school_logo_url": "https://media.licdn.com/dms/image/v2/D560BAQHKohKza3wGfw/company-logo_400_400/company-logo_400_400/0/1713806120231/mcmaster_university_logo?e=1753315200&v=beta&t=Nk3uizvsfI1rgmxE2OWLw5Rk1RVAm1oqCJRuJoXZIzY",
    //                 "start_date": {},
    //                 "end_date": {},
    //                 "school_id": "164897"
    //             },
    //             {
    //                 "school": "Father Michael Goetz",
    //                 "degree": "High School Diploma",
    //                 "duration": "Sep 2020 - Jun 2024",
    //                 "school_linkedin_url": "https://www.linkedin.com/search/results/all/?keywords=Father+Michael+Goetz",
    //                 "start_date": {},
    //                 "end_date": {}
    //             }
    //         ],
    //         "certifications": [
    //             {
    //                 "name": "Git & Github",
    //                 "issuer": "Le Wagon",
    //                 "issued_date": "Issued Aug 2024"
    //             },
    //             {
    //                 "name": "CPR/AED/First Aid",
    //                 "issuer": "SAJE Vital Signs",
    //                 "issued_date": "Issued Mar 2024"
    //             }
    //         ],
    //         "languages": [
    //             {
    //                 "language": "English",
    //                 "proficiency": "Native or bilingual proficiency"
    //             }
    //         ]
    //     }
    // ]
    // return new Response(JSON.stringify(temp), {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    // });
}
