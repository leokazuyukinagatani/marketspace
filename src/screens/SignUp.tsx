import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { useState } from "react";
import {
  Button,
  ButtonText,
  Center,
  Heading,
  Image,
  Input,
  InputInput,
  // ScrollView,
  Text,
  VStack,
  useToast,
} from "@gluestack-ui/react";

import { api } from "@services/api";

// import LogoSvg from "@assets/logo.svg";

// import BackgroundImg from "@assets/background.png";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { ScrollView } from "react-native";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome."),

  email: yup
    .string()
    .required("Informe o e-mail.")
    .email("Informe um e-mail válido."),

  password: yup
    .string()
    .required("Informe a senha.")
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  confirmPassword: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais."),
});

export function SignUp() {
  const toast = useToast();
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }
  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post("/users", { name, email, password });
      await signIn(email, password);
      toast.show({
        // title: "Cadastro realizado com sucesso.",

        placement: "top",
      });
    } catch (err) {
      if (err instanceof AppError) {
        toast.show({
          // title: err.message,
          placement: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    // <ScrollView
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   showsVerticalScrollIndicator={false}
    // >
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
    //         Crie sua conta
    //       </Heading>
    //       <Controller
    //         control={control}
    //         rules={{
    //           required: "Informe o nome.",
    //         }}
    //         name="name"
    //         render={({ field: { onChange, value } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="Nome"
    //               onChangeText={onChange}
    //               value={value}
    //               // errorMessage={errors.name?.message}
    //             />
    //           </Input>
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="email"
    //         render={({ field: { onChange, value } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="E-mail"
    //               keyboardType="email-address"
    //               autoCapitalize="none"
    //               onChangeText={onChange}
    //               value={value}
    //               // errorMessage={errors.email?.message}
    //             />
    //           </Input>
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="password"
    //         render={({ field: { onChange, value } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="Senha"
    //               onChangeText={onChange}
    //               value={value}
    //               secureTextEntry
    //               // errorMessage={errors.password?.message}
    //             />
    //           </Input>
    //         )}
    //       />
    //       <Controller
    //         control={control}
    //         name="confirmPassword"
    //         render={({ field: { onChange, value } }) => (
    //           <Input>
    //             <InputInput
    //               placeholder="Confirme a Senha"
    //               onChangeText={onChange}
    //               value={value}
    //               secureTextEntry
    //               // errorMessage={errors.confirmPassword?.message}
    //               onSubmitEditing={handleSubmit(handleSignUp)}
    //               returnKeyType="send"
    //             />
    //           </Input>
    //         )}
    //       />

    //       <Button
    //         onPress={handleSubmit(handleSignUp)}
    //         // isLoading={isLoading}
    //       >
    //         <ButtonText>Criar e acessar</ButtonText>
    //       </Button>
    //     </Center>

    //     <Button variant="outline" mt={24} onPress={handleGoBack}>
    //       <ButtonText> Voltar para o login</ButtonText>
    //     </Button>
    //   </VStack>
    // </ScrollView>
    <Text>
       Ainda não tem acesso?
    </Text>
  );
}
