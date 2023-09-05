import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "@contexts/AuthContext";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import * as yup from "yup";

import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  Heading,
  Image,
  Input,
  InputInput,
  Text,
  VStack,
  useToast,
} from "@gluestack-ui/react";
// import { Input } from "@components/Input";
// import { Button } from "@components/Button";

// import LogoSvg from "../assets/logo.svg";


// import BackgroundImg from "@assets/background.png";
import { AppError } from "@utils/AppError";

type FormData = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("Informe um e-mail válido."),

  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  // const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(signInSchema) });

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente.";

      // toast.show({
      //   placement: "top",
      // });
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    // <ScrollView
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   showsVerticalScrollIndicator={false}
    // >
    // <Box h="$80" justifyContent="center">
    //   <VStack flex={1} bg="gray.700" px={10} pb={16}>
    //     {/* <Image
    //       source={BackgroundImg}
    //       defaultSource={BackgroundImg}
    //       alt="Pessoas treinando"
    //       resizeMode="contain"
    //       position="absolute"
    //     /> */}
    //     <Center my={24}>
    //       {/* <LogoSvg /> */}
    //       <Text color="gray.100" size="sm">
    //         Treine sua mente e o seu corpo
    //       </Text>
    //     </Center>
    //     <Center>
    //       <Heading color="gray.100" fontSize="xl" fontFamily="heading" mb={6}>
    //         Acesse sua conta
    //       </Heading>
    //       <Controller
    //         control={control}
    //         name="email"
    //         rules={{ required: "Informe seu e-mail" }}
    //         render={({ field: { onChange } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="E-mail"
    //               keyboardType="email-address"
    //               onChangeText={onChange}
    //               // errorMessage={errors.email?.message}
    //               autoCapitalize="none"
    //             />
    //           </Input>
    //         )}
    //       ></Controller>

    //       <Controller
    //         control={control}
    //         name="password"
    //         rules={{ required: "Informe a senha" }}
    //         render={({ field: { onChange } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="Senha"
    //               secureTextEntry
    //               // errorMessage={errors.password?.message}
    //               onChangeText={onChange}
    //             />
    //           </Input>
    //         )}
    //       />

    //       <Button
    //         // title="Acessar"
    //         onPress={handleSubmit(handleSignIn)}
    //         // isLoading={isLoading}
    //       >
    //         <ButtonText>Acessar</ButtonText>
    //       </Button>
    //     </Center>
    //     <Center mt={24}>
    //       <Text color="gray.100" size="sm" mb={3} fontFamily="body">
    //         Ainda não tem acesso?
    //       </Text>
    //       <Button
    //         // title="Criar Conta"
    //         variant="outline"
    //         onPress={handleNewAccount}
    //       >
    //         <ButtonText>Criar Conta</ButtonText>
    //         {/* <ButtonSpinner   /> */}
    //       </Button>
    //     </Center>
    //   </VStack>
    // </Box>

    <Text>
       Ainda não tem acesso?
    </Text>
  );
}
