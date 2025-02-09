import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthRequestDto } from './dtos/auth.request.dto';
import { AuthResponseDto } from './dtos/auth.response.dto';
import AWSProvider from '@providers/aws/aws.provider';

describe('AuthController', () => {
    let authController: AuthController;
    let awsProvider: AWSProvider;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AWSProvider,
                    useValue: {
                        GetOAuthToken: jest.fn(),
                    },
                },
            ],
        }).compile();

        awsProvider = moduleRef.get<AWSProvider>(AWSProvider);
        authController = new AuthController(awsProvider);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
        expect(awsProvider).toBeDefined();
    });

    describe('getOAuthToken', () => {
        it('should return an AuthResponseDto', async () => {
            const code = 'test_code';
            const result: AuthResponseDto = {
                id_token: 'test_id_token',
                access_token: 'test_access_token',
                refresh_token: 'test_refresh_token',
                expires_in: 3600,
                token_type: 'Bearer',
            };

            jest.spyOn(awsProvider, 'GetOAuthToken').mockResolvedValue(result);

            const authRequestDto: AuthRequestDto = { code };
            expect(await authController.getOAuthToken(authRequestDto)).toBe(result);
        });

        it('should throw an error if GetOAuthToken fails', async () => {
            const code = 'test_code';
            const errorMessage = 'Failed to get OAuth token';

            jest.spyOn(awsProvider, 'GetOAuthToken').mockRejectedValue(new Error(errorMessage));

            const authRequestDto: AuthRequestDto = { code };

            await expect(authController.getOAuthToken(authRequestDto)).rejects.toThrow(expect.objectContaining({
                message: errorMessage,
                name: 'Error',
            }));
        });
    });
});