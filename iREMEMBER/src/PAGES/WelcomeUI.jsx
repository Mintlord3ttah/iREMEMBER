import { useNavigate } from "react-router-dom";
import GreenBtn from "../UI/GreenBtn";
import Heading from "../UI/Heading";
import HowItWorksCard from "../UI/HowItWorksCard";

export default function WelcomeUI() {
    const storedId = localStorage.getItem("joker")
    const storedAccessToken = localStorage.getItem("accessToken")
    const verify = storedAccessToken && storedId
    const navigate = useNavigate()

    function handleClick(){
        if(!verify) return navigate("/Auth/Login")
        navigate("/app")
    }

    
  return (
    <section className="flex flex-col gap-0 justify-center items-center px-8">
    <div className="h-screen flex justify-center items-center gap-8 flex-col w-[30rem] max-[510px]:w-full">
        <h1 className="text-center text-4xl font-bold">Organise all  your
            <span className="text-yellow-500"> important items</span> whenever you are stepping out</h1>
        <p className="text-center text-xl">Go your way with a peaceful mind and curb that nasty moment when you remember an important item and you've moved far away from home...</p>
        <div className="flex gap-4">
            <GreenBtn onClick={handleClick}>Get Started</GreenBtn>
            <GreenBtn bg="transparent">How It Works</GreenBtn>
        </div>
        </div>

        <div className="max-w-[45rem] flex flex-col gap-4 ">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <div className="grid grid-cols-3 max-[510px]:grid-cols-1 max-[700px]:grid-cols-2 gap-4 ">
            <HowItWorksCard>
                <Heading>
                    Handy and easy to remember
                </Heading>
                <p>
                    Just telling yourself <strong>"I Remember"</strong> phrase will automatically remind you to use the app whenever you are set to leave home.
                </p>
            </HowItWorksCard>
            <HowItWorksCard>
                <Heading>
                    No More Regrets
                </Heading>
                <p>
                    Once you remember the app the rest is solved. Just take a quick look at the items on board and modify list as it suites the occassion
                </p>
            </HowItWorksCard>
            <HowItWorksCard>
                <Heading>
                    Set your reminder early   
                </Heading>
                <p>
                Your reminder is your way to successfully avoid last minute hassle and gives you the mental freedom to plan other things.
                </p>
            </HowItWorksCard>
            <HowItWorksCard>
                <Heading>
                    Add multiple items
                </Heading>
                <p>
                    For speed you can add multiple items in one go by seperating each with a comma, but diplicates are removed.
                </p>
            </HowItWorksCard>
            <HowItWorksCard>
                <Heading>
                    Compare your list with items
                </Heading>
                <p>
                    Check your packed items if they tally with list. easier to tick as you pack.
                </p>
            </HowItWorksCard>
            <HowItWorksCard>
                <Heading>
                    Easy layout list
                </Heading>
                <p>
                    Manage how you want list to be arranged. either by priority, time, or custom. Just easy enough to have a quick review
                </p>
            </HowItWorksCard>
            </div>
    </div>
    <div className="max-w-[45rem] flex flex-col justify-center items-center gap-4 mt-16">
        <h3 className="text-center text-5xl font-bold">Save time and reduce mental stress as you go out</h3>
        <GreenBtn>Get Started</GreenBtn>
    </div>
    </section>
  )
}
