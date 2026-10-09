import { Link } from "../router";

export const Navbar = () => {
  console.log("Navbar 렌더링");
  return (
    <nav className="flex flex-col gap-2 p-4 border-r border-gray-300">
      <Link to='/nunu'{... {className: "hover:text-blue-500"}}>누누</Link>
      <Link to='/jingni' {... {className: "hover:text-blue-500"}}>징니</Link>
      <Link to='/jen' {... {className: "hover:text-blue-500"}}>젠</Link>
      <Link to='/eden' {... {className: "hover:text-blue-500"}}>이든</Link>
      <Link to='/not-found' {... {className: "hover:text-blue-500"}}>NOT FOUND</Link>
    </nav>
  );
};