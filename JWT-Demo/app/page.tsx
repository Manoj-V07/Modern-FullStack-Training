import logout from "@/app/actions/logout"

function Home() {
    return (
        <form action={logout}>
            <button>
                Logout
            </button>
        </form>
    )
}

export default Home;