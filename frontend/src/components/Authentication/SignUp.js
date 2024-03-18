// import {
//   FormControl,
//   Input,
//   VStack,
//   FormLabel,
//   InputGroup,
//   InputRightElement,
//   Button,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// // import { json } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const SignUp = () => {
//   const [name, setname] = useState();
//   const [password, setpassword] = useState();
//   const [confirmpassword, setconfirmpassword] = useState();
//   const [pic, setpic] = useState();
//   const [email, setemail] = useState();
//   const [show, setshow] = useState(false);
//   const [loading, setloading] = useState(false);
//   const naviagte = useNavigate();
//   const toast = useToast();
//   // let show = false;

//   const handleClick = () => {
//     setshow(!show);
//   };

//   const submitHandler = async () => {
//     setloading(true);

//     if (!name || !email || !password || !confirmpassword) {
//       toast({
//         title: "please fill all the feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });

//       setloading(false);
//       return;
//     }
//     if (password !== confirmpassword) {
//       toast({
//         title: "Passwords Do not match",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }

//     try {
//       const config = {
//         headers: {
//           "content-type": "application/json",
//         },
//       };
//       const { data } = await axios.post(
//         "/api/user/",
//         { name, email, password, pic },
//         config
//       );
//       console.log(data);
//       toast({
//         title: "Login SuccesFull",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setloading(false);
//       naviagte("/chat");
//     } catch (error) {
//       toast({
//         title: "Error Ocuured",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   const postDetails = (pics) => {
//     setloading(true);
//     if (pics === undefined) {
//       toast({
//         title: "please select an image",
//         status: "Info",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setloading(false);
//       return;
//     }

//     // console.log(pics);
//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "chat-app");
//       data.append("cloud_name", "dgasrlxej");
//       console.log(data);
//       fetch("https://api.cloudinary.com/v1_1/dgasrlxej/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then(
//           (res) => res.json()
//           // console.log(res.json())
//         )
//         .then((data) => {
//           // console.log(data);
//           setpic(data.url.toString());

//           setloading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setloading(false);
//         });
//     } else {
//       toast({
//         title: "please select an image",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//     setloading(false);

//     return;
//   };
//   return (
//     <VStack>
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setname(e.target.value)}
//         ></Input>
//       </FormControl>

//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter Your email"
//           onChange={(e) => setemail(e.target.value)}
//         ></Input>
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter Your password"
//             onChange={(e) => setpassword(e.target.value)}
//           ></Input>
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="confirmpassword" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="confirm Your password"
//             onChange={(e) => setconfirmpassword(e.target.value)}
//           ></Input>
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="pic" isRequired>
//         <FormLabel>Upload Your Pic</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         ></Input>
//       </FormControl>

//       <Button
//         color="red"
//         width="30%"
//         isLoading={loading}
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//       >
//         SignUp
//       </Button>
//     </VStack>
//   );
// };

// export default SignUp;

import {
  FormControl,
  Input,
  VStack,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [session, setSession] = useState(0);

  const sessionHandleChange = (e) => {
    setSession(e.target.value);
  };
  const sessions = [];
  for (let year = new Date().getFullYear(); year >= 1990; year -= 1) {
    const startYear = year;
    const endYear = year + 4;
    sessions.push(`${startYear}-${endYear}`);
  }
  const [branch, setBranch] = useState("");

  const branchHandleChange = (e) => {
    setBranch(e.target.value);
  };

  const branches = [
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Information Technology" },
    { id: 3, name: "Electronics" },
    // Add more branches here
  ];
  const [link, setLink] = useState();
  const [name, setname] = useState();
  const [password, setpassword] = useState();
  const [confirmpassword, setconfirmpassword] = useState();
  const [pic, setpic] = useState();
  const [email, setemail] = useState();
  const [show, setshow] = useState(false);
  const [loading, setloading] = useState(false);
  const naviagte = useNavigate();
  const toast = useToast();
  // let show = false;

  const handleClick = () => {
    setshow(!show);
  };

  const submitHandler = async () => {
    setloading(true);

    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setloading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/",
        { name, email, password, pic, session, branch },
        config
      );
      console.log(data);
      toast({
        title: "Login SuccesFull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      naviagte("/home");
    } catch (error) {
      toast({
        title: "Error Ocuured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const postDetails = (pics) => {
    setloading(true);
    if (pics === undefined) {
      toast({
        title: "please select an image",
        status: "Info",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    // console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dgasrlxej");
      console.log(data);
      fetch("https://api.cloudinary.com/v1_1/dgasrlxej/image/upload", {
        method: "post",
        body: data,
      })
        .then(
          (res) => res.json()
          // console.log(res.json())
        )
        .then((data) => {
          // console.log(data);
          setpic(data.url.toString());

          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    } else {
      toast({
        title: "please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    setloading(false);

    return;
  };
  return (
    <VStack>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your email"
          onChange={(e) => setemail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => setpassword(e.target.value)}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="confirm Your password"
            onChange={(e) => setconfirmpassword(e.target.value)}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="session" isRequired bg="">
        <FormLabel>Session</FormLabel>
        <InputGroup>
          <Input
            bg="gray"
            as="select"
            placeholder="Select session"
            value={session}
            onChange={sessionHandleChange}
          >
            <option bg="gray" value="">
              Select session
            </option>
            {sessions.map((session, index) => (
              <option bg="gray" key={index} value={session}>
                {session}
              </option>
            ))}
          </Input>
        </InputGroup>
      </FormControl>

      <FormControl id="branch" isRequired>
        <FormLabel>Branch</FormLabel>
        <InputGroup bg="gray">
          <Input
            as="select"
            placeholder="Select branch"
            value={branch}
            onChange={branchHandleChange}
          >
            <option value="">Select branch</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </Input>
        </InputGroup>
      </FormControl>

      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <FormControl id="Linkedin" isRequired>
        <FormLabel>Linkedin Profile</FormLabel>
        <InputGroup>
          <Input
            type="input"
            placeholder="Enter your LinkedIn profile link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          ></Input>
        </InputGroup>
      </FormControl>

      <Button
        color="red"
        width="30%"
        isLoading={loading}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
