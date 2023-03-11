using System.Numerics;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context , ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;

        }

        [HttpPost]
        [Route("Register")] // api/account/register
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
        {
            if (await UserExists(registerDTO.userName)) return BadRequest("UserName 已存在 !!");
            using var hmac = new HMACSHA512();

            var newAppUser = new AppUser
            {
                UserName = registerDTO.userName.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password)),
                PasswordSalt = hmac.Key

            };
            _context.Add(newAppUser);
            await _context.SaveChangesAsync();
            return new UserDTO
            {
                userName = newAppUser.UserName,
                token = _tokenService.CreateToken(newAppUser)
            };
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDTO.userName);
            if (user == null) return Unauthorized("invalid UserName");

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.password));
            //比對每一個位元
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("invalid password");
            }
            return new UserDTO
            {
                userName = user.UserName,
                token = _tokenService.CreateToken(user)
            };

            /* 
            if (computedHash == user.PasswordHash) return user;
            else return Unauthorized();*/

        }

        private async Task<bool> UserExists(string userName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
        }
    }
}